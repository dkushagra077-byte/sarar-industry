const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const config = require('../src/config/environment');
const { supabase, isConfigured } = require('../src/config/database');

const bootstrapAdmin = async () => {
  if (!isConfigured || !supabase) {
    throw new Error('Configure a valid SUPABASE_URL and SUPABASE_SECRET_KEY (or legacy SUPABASE_SERVICE_ROLE_KEY) first.');
  }
  if (!config.ADMIN_EMAIL || !config.ADMIN_PASSWORD || config.ADMIN_PASSWORD.length < 16) {
    throw new Error('Set ADMIN_EMAIL and a unique ADMIN_PASSWORD of at least 16 characters in backend/.env or the deployment environment.');
  }

  const email = config.ADMIN_EMAIL.trim().toLowerCase();
  const { data: existing, error: lookupError } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .maybeSingle();
  if (lookupError) throw new Error(`Could not check existing administrator: ${lookupError.message}`);

  const { error } = await supabase.from('users').upsert({
    id: existing?.id || crypto.randomUUID(),
    name: config.ADMIN_NAME,
    email,
    password_hash: await bcrypt.hash(config.ADMIN_PASSWORD, 12),
    role: 'superadmin',
    status: 'active',
    updated_at: new Date().toISOString()
  }, { onConflict: 'email' });

  if (error) throw new Error(`Could not create administrator: ${error.message}`);
  console.log(`Administrator ${email} is ready. Remove ADMIN_PASSWORD from production runtime variables after this one-time command.`);
};

bootstrapAdmin().catch((error) => {
  console.error(`Administrator bootstrap failed: ${error.message}`);
  process.exitCode = 1;
});
