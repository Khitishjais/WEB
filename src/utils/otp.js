export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const verifyOtp = (input, generated) => {
  return input === generated;
};

export const sendOtp = async (phone, otp) => {
  // Mocking an API call to send OTP
  console.log(`[OTP] Sending ${otp} to ${phone}`);
  return new Promise((resolve) => setTimeout(resolve, 1500));
};
