
let totalData = [];

function add() {
    var nameEl = $("#name").val();
    var ageEl = $("#age").val();
    var branchEl = $("#branch").val();
    const postData = {
        name: nameEl,
        age: ageEl,
        branch: branchEl
    };

    if (nameEl === "" && ageEl === "" && branchEl === "") {
        alert("Please fill in all details");
    } else {
        fetch("http://localhost:3000/student", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        })
        .then(response => response.json())
        .then(data => {
            totalData = data;
            console.log("josn data", totalData);
            getData();
            // alert("holding the post data");
        })
        .catch(error => {
            alert("Invalid URL");
        });
    }
    
}
getData();

function getData() {
    fetch("http://localhost:3000/student")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            totalData = data;
            console.log("this is data", totalData);
            let collectData = "";
            totalData.map(item => {
                collectData += `
                <tr>
                <th>${item.id}</th>
                <td>${item.name}</td>
                <td>${item.age}</td>
                <td>${item.branch}</td>
                <td><button type="button" class="btn btn-primary" onclick="update(${item.id})">Update</button></td>
                <td><button type="button" class="btn btn-danger" onclick="remove(${item.id})">Remove</button></td>
                </tr>`;

            });
            document.getElementById("tableData").innerHTML = collectData;
        })
        .catch(error => {
            alert("you Got Error");
        });
}


// Update Student function (PUT)


function update(id) {
    let x = totalData.find(item => item.id === id);
    console.log("this is id", x);
    $("#name").val(x.name);
    $("#age").val(x.age);
    $("#branch").val(x.branch);
    $("#edbtn").css('display', 'block');
    $("#adbtn").css('display', 'none');
    $("#ahead").css('display', 'none');
    $("#ehead").css('display', 'block');
    $('#edbtn').click(function () {
        let nameEl = $('#name').val();
        let ageEl = $('#age').val();
        let branchEl = $('#branch').val();
        console.log(nameEl, "name");
        let UpdateData = {
            name: nameEl,
            age: ageEl,
            branch: branchEl
        }
        console.log("updated", UpdateData);
        const url = "http://localhost:3000/student";
        fetch(`${url}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(UpdateData),
        })
            .then(response => response.json())
            .then(data => {
                console.log("Updated", data);
            })
            .catch(error => {
                alert("invalid Url")
            });
    })

}




// Delete Record  function (DELETE)

function remove(id) {
    const url = `http://localhost:3000/student/${id}`;

    fetch(url, {
        method: "DELETE",
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log("Record Deleted Successfully...!");
    })
    .catch(error => {
        console.error("Error:", error.message);
        alert("Failed to delete student. Please try again later.");
    });
}

