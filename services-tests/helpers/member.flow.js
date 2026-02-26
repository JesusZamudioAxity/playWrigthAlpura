export async function generateNip(apiClient, payload, expect) {
  const response = await apiClient.post('/api/outsider/register/sms/nip', payload);
  if (response.status() !== 200) {
    console.error('Failed to generate NIP:', await response.text());
    throw new Error('Failed to generate NIP');
  }
  const body = await response.json();
  console.log('NIP Response Body:', body);
  expect(body.success).toBe(true);
}

export async function checkNip(apiClient, payload, expect) {
  const response = await apiClient.post('/api/support/recovery/nip', payload, {
    'X-QA-Confirmed-Number': 'true',
    'X-QA-Access-Token': 'qa-team-secretz'
  });
  if (response.status() !== 200) {
    console.error('Failed to check NIP:', await response.text());
    throw new Error('Failed to check NIP');
  }
  const body = await response.json();
  console.log('Check NIP Response Body:', body);
  expect(body.success).toBe(true);
}
