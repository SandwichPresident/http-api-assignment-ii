const users = {};

const respondJSON = (request, response, status, object) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    response.writeHead(status, headers);

    // If HEAD request or 204 No Content, send headers only without body
    if (request.method === 'HEAD' || status === 204) {
        return response.end();
    }

    response.write(JSON.stringify(object));
    return response.end();
};

const getUsers = (request, response) => {
    const responseObj = {
        users,
    };
    respondJSON(request, response, 200, responseObj);
};

const addUser = (request, response, body) => {
    const responseJSON = {
        message: 'Name and age are both required.',
    };

    if (!body.name || !body.age) {
        responseJSON.id = 'addUserMissingParams';
        return respondJSON(request, response, 400, responseJSON);
    }

    let responseCode = 201; // Created
    if (users[body.name]) {
        responseCode = 204; // Updated (No Content)
    } else {
        users[body.name] = {};
    }

    users[body.name].name = body.name;
    users[body.name].age = body.age;

    if (responseCode === 201) {
        responseJSON.message = 'Created Successfully';
        return respondJSON(request, response, 201, responseJSON);
    }

    return respondJSON(request, response, 204);
};

const notFound = (request, response) => {
    const responseJSON = {
        message: 'The page you are looking for was not found.',
        id: 'notFound',
    };
    respondJSON(request, response, 404, responseJSON);
};

module.exports = {
    getUsers,
    addUser,
    notFound,
};