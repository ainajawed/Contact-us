document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let fname = document.getElementById('fname').value;
    let lname = document.getElementById('lname').value;
    let email = document.getElementById('email').value;
    let number = document.getElementById('number').value;
    let message = document.getElementById('message').value;
    
    if (fname && lname && email && number && message) {
        const form = document.getElementById('contactForm');
        const result = document.getElementById('response');
        
        form.addEventListener('submit', function(e) {
          e.preventDefault();
          const formData = new FormData(form);
          const object = Object.fromEntries(formData);
          const json = JSON.stringify(object);
          result.innerHTML = "Please wait..."
        
            fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: json
                })
                .then(async (response) => {
                    let json = await response.json();
                    if (response.status == 200) {
                        result.innerHTML = `Thank you, ${fname}! Your message has been sent.`;
                    } else {
                        console.log(response);
                        result.innerHTML = "Information is Invalid";
                    }
                })
                .catch(error => {
                    console.log(error);
                    result.innerHTML = "Something went wrong!";
                })
                .then(function() {
                    form.reset();
                    setTimeout(() => {
                        result.style.display = "none";
                    }, 3000);
                });
        });
    } else {
      result.innerHTML = 'Please fill out all fields.';
    }
  });
  
  