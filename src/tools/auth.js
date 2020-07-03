export function customFetch(url, data={}, fn=fetch) {
    const fetchPromise = fn(url, {
        ...data,
        credentials: 'include'
    }).then(resp => {
        if (resp.status >= 400)
            throw new Error(resp.statusText)
        return resp
    }).catch(err => {
        console.log('Error customFetch: ', err);
    })
    return fetchPromise
}
