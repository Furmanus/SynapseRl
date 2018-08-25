module.exports = {
    forceRedirect: function (path, request, response) {
        const {
            body
        } = request;

        if (body && body.isAjaxRequest) {
            response.send({
                redirect: path
            });
        } else {
            response.redirect(path);
        }
    }
};