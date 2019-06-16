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
