const fs = require('fs');
const crypto = require('crypto');

module.exports = async function() {
  const envPath = path.join(process.cwd(), '.env');  // current working dir

  // Generate 32 random bytes base64 key
  const newKey = 'base64:' + crypto.randomBytes(32).toString('base64');

  // Read existing .env or create empty content
  let env = '';
  if (fs.existsSync(envPath)) {
    env = fs.readFileSync(envPath, 'utf8');
  }

  // Replace or add APP_KEY line
  if (env.includes('APP_KEY=')) {
    env = env.replace(/APP_KEY=.*/g, `APP_KEY=${newKey}`);
  } else {
    if (env.length > 0 && !env.endsWith('\n')) {
      env += '\n';
    }
    env += `APP_KEY=${newKey}\n`;
  }

  // Write to .env
  fs.writeFileSync(envPath, env);

  console.log(`✅ APP_KEY set to: ${newKey}`);
};
