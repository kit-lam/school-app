export async function getSchools() {
  try {
    const response = await fetch(
      "https://data.cityofnewyork.us/resource/s3k6-pzi2.json"
    );
    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function getSatScores(dbn) {
  try {
    const response = await fetch(
      `https://data.cityofnewyork.us/resource/f9bf-2cp4.json?dbn=${dbn}`
    );
    return response.json();
  } catch (error) {
    console.error(error);
  }
}
