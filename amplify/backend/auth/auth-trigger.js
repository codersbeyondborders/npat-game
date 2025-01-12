exports.handler = async (event, context) => {
  // Post Confirmation Lambda trigger
  if (event.triggerSource === 'PostConfirmation_ConfirmSignUp') {
    try {
      // Create player profile after successful signup
      const { username } = event.request.userAttributes;
      
      // Return the event object
      return event;
    } catch (error) {
      console.error('Error in post confirmation trigger:', error);
      throw error;
    }
  }
  return event;
};