type HygraphProps = {
    query: string
}

export async function fetchHygraph(query: string) {
    const endpoint = process.env.EXPO_PUBLIC_HYGRAPH_ENDPOINT;
    const token = process.env.EXPO_PUBLIC_HYGRAPH_TOKEN;

    if (!endpoint || !token) {
        throw new Error("Missing Hygraph enpoint or token");
    }

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({query})
        });

        if (!response.ok) {
            throw new Error(`HTTP error. Status: ${response.status} | ${response.statusText}`)
        };

        const json = await response.json();

        if(!json.data) {
            throw new Error("No data returned from Hygraph");
        };

        console.log(`Data fetched successfully: ${response.status} | ${response.statusText}`);
        return json.data;

    } catch (error) {

        console.error("Error fetching data from Hygtaph: ", error);
        throw new Error(`Error fetching data from Hygraph: ${error}`);

    }
}