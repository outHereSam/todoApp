<?php

require_once('database_connection.php');
require_once('query_functions.php');

// Detect if the request coming in is an ajax request
function is_ajax_request()
{
    return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest';
}

// if the request is not an ajax request, exit stone cold
if (!is_ajax_request()) {
    exit;
}

// Extract the data
$todoItem = isset($_POST['task']) ? $_POST['task'] : '';

// Insert data into database
insert_task($connection, $todoItem);

// Close database connection
if (isset($connection)) {
    mysqli_close($connection);
}
