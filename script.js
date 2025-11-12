(function() {
  const example = document.getElementById('example')
  const cw1 = document.getElementById('cw1')
  const cw2 = document.getElementById('cw2')
  const cw3 = document.getElementById('cw3')
  const answer = document.getElementById('answer')
  const form = document.querySelector('form');
  const dropdown = document.getElementById('posts');

  example.addEventListener("click", function() {
    fetch('https://restcountries.com/')
      .then(response => response.json())
      .then(array => {
        console.log(array)
        answer.innerHTML = JSON.stringify(array);
      })
  })
    // Fetch that specific post
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(response => response.json())
      .then(post => {
        console.log(post);
        answer.innerHTML = `
          <h3>${post.title}</h3>
          <p>${post.body}</p>
        `;
      });
  });
})();
