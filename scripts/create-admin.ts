import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '../src/infrastructure/db/mongoose';
import { UserModel } from '../src/infrastructure/models/user.model';
import { Roles } from '../src/domain/constants/roles';

async function main() {
  const email = process.argv[2];
  const password = process.argv[3];
  const fullName = process.argv[4] || 'Admin User';

  if (!email || !password) {
    console.error('Usage: npm run create-admin -- admin@example.com Password123 "Full Name"');
    process.exit(1);
  }

  const connection = await connectToDatabase();
  if (!connection) {
    throw new Error('MongoDB URI is missing. Set MONGODB_URI before running this script.');
  }
  const passwordHash = await bcrypt.hash(password, 12);
  await UserModel.updateOne(
    { email: email.toLowerCase() },
    { $set: { fullName, email: email.toLowerCase(), passwordHash, roles: [Roles.Admin], isActive: true } },
    { upsert: true }
  );
  console.log(`Admin user saved: ${email}`);
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
