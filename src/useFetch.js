import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    //const url = 'http://localhost:8000/blogs'

    useEffect(() => {
        //use a AbortController to stop fetching data when no needed
        const abortCont = new AbortController();

        setTimeout(() => {
            fetch(url, { signal: abortCont.signal })
                .then(response => {
                    if (!response.ok) {
                        throw Error("error thrown and then catched");
                    }
                    return response.json();
                })
                //it fires when the response object is resolved
                .then(data => {
                    setData(data);
                    setIsPending(false);
                    setError(null);
                })
                //catch any kind of network errors
                .catch(err => {
                    if (err.name === "AbortError") {
                        console.log("fetch aborted");
                    } else {
                        setIsPending(false);
                        setError(err.message);
                    }

                })
        }, 1000); //render the Loading div for 1 sec

        return () => abortCont.abort();
    }, [url])

    //to grab the properties to use elsewhere return their values
    return { data, isPending, error }
}

export default useFetch;