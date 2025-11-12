(function () {
  const answer = document.getElementById("answer");
  const answer2 = document.getElementById("answer2");
  const form = document.querySelector("form");
  const dropdown = document.getElementById("posts");
  const NOAA_TOKEN = "lTvthmKNKlAImhehxohHEboeyEPhaorb";
  const LIMIT = 1000;
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    
    const postId = dropdown.value;
    console.log("Selected capital:", postId);

    fetch(`https://restcountries.com/v3.1/capital/${postId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Błąd HTTP! Status: ${response.status}. Sprawdź, czy ${postId} jest poprawną stolicą.`,
          );
        }
        return response.json();
      })
      .then((countriesData) => {
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
        countriesData.forEach((country) => {
          const name = country.name.common;
          const capital = country.capital ? country.capital[0] : "N/A";
          const population = country.population
            ? country.population.toLocaleString("pl-PL")
            : "N/A";
          const region = country.region || "N/A";
          const subregion = country.subregion || "N/A";
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
      });
  });
  async function fetchAllStations() {
    let allStations = [];
    let offset = 0; 

    answer2.innerHTML = '<p>Ładowanie stacji... Proszę czekać (API NOAA wymaga stronicowania).</p>';

    while (true) {
        const url = `https://www.ncdc.noaa.gov/cdo-web/api/v2/stations?limit=${LIMIT}&offset=${offset}`;
        try {

            const response = await fetch(url, {
                headers: {
                    "token": NOAA_TOKEN 
                }
            });

            if (!response.ok) {
                 throw new Error(`Błąd HTTP! Status: ${response.status}. Sprawdź klucz API.`);
            }

            const data = await response.json();
            const currentStations = data.results || [];

            if (currentStations.length === 0) {
                break;
            }

            allStations = allStations.concat(currentStations);
            offset += LIMIT; 

        } catch (error) {
            console.error("Wystąpił błąd podczas pobierania stacji:", error);
            answer2.innerHTML = `<p style="color: red;">Nie udało się pobrać stacji: ${error.message}</p>`;
            return;
        }
    }

    displayStations(allStations);
  }

  function displayStations(stationsData) {
    if (stationsData.length === 0) {
         answer2.innerHTML = '<p>Brak stacji do wyświetlenia. Czy klucz API jest poprawny?</p>';
         return;
    }

    let htmlContent = `
        <p>Wyświetlam dane dla ${stationsData.length} stacji:</p>
        <table>
            <thead>
                <tr>
                    <th>ID Stacji</th>
                    <th>Name</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                </tr>
            </thead>
            <tbody>
    `;

    stationsData.forEach((station) => {
        const id = station.id;
        const name = station.name;
        const latitude = station.latitude || 'N/A';
        const longitude = station.longitude || 'N/A';

        htmlContent += `
            <tr>
                <td>${id}</td>
                <td>${name}</td>
                <td>${latitude}</td>
                <td>${longitude}</td>
            </tr>
        `;
    });

    htmlContent += `
            </tbody>
        </table>
    `;

    answer2.innerHTML = htmlContent;
  }
  fetchAllStations();
})();
