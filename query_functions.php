<?php

function insert_task($connection, $todoItem)
{
    $sql = "INSERT INTO tasks ";
    $sql .= "(description) ";
    $sql .= "VALUES (";
    $sql .= "'" . $todoItem . "'";
    $sql .= ")";

    $result = mysqli_query($connection, $sql);

    // For INSERT statements, $result is true/false
    if ($result) {
        $new_id = mysqli_insert_id($connection);
        $response = array(
            'id' => $new_id,
            'description' => $todoItem
        );
        echo json_encode($response);
    } else {
        echo mysqli_error($connection);
        mysqli_close($connection);
        exit;
    }
}
