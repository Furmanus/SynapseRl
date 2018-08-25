export async function fetchFormData (url = '', form = {}) {
    const formData = new FormData(form);

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        });
        if (response.ok) {
            return prepareResponse(response);
        }
        throw new Error(`${response.status} error while fetching data.`);
    } catch (err) {
        throw new Error(err);
    }
}
export async function fetchPostData (url = '', data = {}) {
    data = Object.assign(data, {
        isAjaxRequest: true
    });
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
        if (response.ok) {
            return prepareResponse(response);
        }
        throw new Error(`${response.status} error while fetching data.`)
    } catch (err) {
        throw new Error(err);
    }
}
export async function fetchGetData (url = '', data = {}) {
    data = Object.assign(data, {
        isAjaxRequest: true
    });
    try {
        const response = await fetch(url);
        if (response.ok) {
            return prepareResponse(response);
        }
        throw new Error(`${response.status} error while fetching data.`)
    } catch (err) {
        throw new Error(err);
    }
}
async function prepareResponse(res) {
    const resolvedRes = await res.json();
    const newLocation = resolvedRes.redirect;

    if (newLocation) {
        window.location = newLocation;
    } else {
        return resolvedRes;
    }
}