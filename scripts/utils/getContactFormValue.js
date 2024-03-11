export default function onSubmit(event) {
  event.preventDefault();
  const formValues = {
    firstName: document.getElementById('first-name').value,
    lastName: document.getElementById('last-name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value,
  };

  console.log('Form Values:', formValues);
}
