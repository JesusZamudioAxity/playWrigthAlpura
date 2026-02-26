import {
  generateNip,
  checkNip,
  registerAttempt,
  activateEmail,
  completeRegister
} from './member.api.js';

export async function prepareValidRegistration(apiClient, payloads) {
  
  // 1️⃣ Generar NIP
  const nipRes = await generateNip(apiClient, payloads.nip);
  const nipBody = await nipRes.json();

  // 2️⃣ Check NIP
  await checkNip(apiClient, payloads.checkNip);

  // 3️⃣ Register attempt
  const registerRes = await registerAttempt(apiClient, payloads.register);

  return registerRes;
}