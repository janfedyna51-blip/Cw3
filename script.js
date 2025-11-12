(function() {
   
    const answer = document.getElementById('answer');
    const form = document.querySelector('form');
    const dropdown = document.getElementById('posts');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const postId = dropdown.value; 
        console.log('Selected capital:', postId);

        fetch(`https://restcountries.com/v3.1/capital/${postId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Błąd HTTP! Status: ${response.status}. Sprawdź, czy ${postId} jest poprawną stolicą.`);
                }
                return response.json();
            })
            .then(countriesData => { 
                console.log(countriesData);
                let htmlContent = `
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Capital</th>
                                <th>Population</th>
                                <th>Region</th>
                                <th>Subregion</th>
                            </tr>
                        </thead>
                        <tbody>
                `;
                countriesData.forEach(country => {
                    const name = country.name.common;
                    const capital = country.capital ? country.capital[0] : 'N/A';
                    const population = country.population ? country.population.toLocaleString('pl-PL') : 'N/A';
                    const region = country.region || 'N/A';
                    const subregion = country.subregion || 'N/A'; 
                    htmlContent += `
                        <tr>
                            <td>${name}</td>
                            <td>${capital}</td>
                            <td>${population}</td>
                            <td>${region}</td>
                            <td>${subregion}</td>
                        </tr>
                    `;
                });

                htmlContent += `
                        </tbody>
                    </table>
                `;

                answer.innerHTML = htmlContent;
            })
            .catch(error => {
                console.error("Wystąpił błąd podczas pobierania danych:", error);
                answer.innerHTML = `<p style="color: red;">Wystąpił błąd podczas ładowania danych: ${error.message}</p>`;
            });
    });
})();