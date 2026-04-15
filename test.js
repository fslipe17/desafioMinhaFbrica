fetch("http://localhost:5000/api/v1/auth/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    email: "joao@email.com",
    password: "123456"
  })
})
.then(res => res.json())
.then(data => console.log(data));