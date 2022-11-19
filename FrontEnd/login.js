var user_name, user_password, query;
const login = async () =>
{
    user_name = document.getElementById("form3Example3").value;
    user_password = document.getElementById("form3Example4").value;
    query = `SELECT * FROM "video_game_db"."Player" WHERE "Player_ID"='${user_name}' AND "Password"='${user_password}'`;
    console.log(query);
    await insertData(query)
}

console.log(user_name);
console.log(user_password);

const insertData = async (query) =>
{
    // console.log(query);
    await fetch(`http://localhost:3030/query`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: query }),
    })
        .then((res) => res.json())
        .then((result2) =>
        {
            if (result2.err) {
                const body = document.body;
                console.log("Not");
                body.appendChild(
                    document.createTextNode("Not login.")
                );
            } else {
                // Check if >= 2 or Zero entries are there then print error
                const body = document.body;

                if (result2.data.rowCount == 1) {
                    // console.log("Logged In successfully");
                    show();
                    let q = `SELECT "F_Name", "L_Name", "DOB", "Email_ID", "Wallet" FROM "video_game_db"."Player" WHERE "Player_ID" = '${user_name}';`;
                    fetchTable(q, "mydiv7", "tabledata7");

                    let q1 = `SELECT "Purchase_ID", "Purchase_Type", "Game_ID", "Game_Name", "Date_Purchased", "Card_Number"
                    FROM "video_game_db"."Purchase" NATURAL JOIN "video_game_db"."Game"
                    WHERE "Player_ID" = '${user_name}';`;
                    fetchTable(q1, "mydiv4", "tabledata4");

                    let q2 = `SELECT "Achv_ID", "Date_Achieved" FROM "video_game_db"."Achieves" WHERE "Player_ID" = '${user_name}';`;
                    fetchTable(q2, "mydiv5", "tabledata5");

                    let q3 = `SELECT "Season_No", "Reward_Amount", "Game_ID", "Game_Name", "Date_Rewarded"  FROM "video_game_db"."Season_Rewards" NATURAL JOIN "video_game_db"."Game" WHERE "Player_ID" = '${user_name}';`;
                    fetchTable(q3, "mydiv6", "tabledata6");
                }
            }
        })
        .catch((err) =>
        {
            console.log(err);
        });
};

const fetchTable = async (query, table_div, table_data) =>
{
    const data = {
        query: "SELECT table_name FROM information_schema.tables WHERE table_schema='video_game_db' AND table_type='BASE TABLE';",
    };
    fetch(`http://localhost:3030/query`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: query }),
    })
        .then((res) => res.json())
        .then((result2) =>
        {
            //console.log(result2);
            if (result2.err) {
                const body = document.getElementById(`${table_div}`);
                body.appendChild(
                    document.createTextNode(JSON.stringify(result2.data))
                );
                return;
            }
            const result = result2.data;
            let t = document.getElementById(`${table_data}`);
            t.remove();
            const body = document.getElementById(`${table_div}`);
            var table = document.createElement("table");
            table.setAttribute("id", `${table_data}`);
            // head
            let thead = table.createTHead();
            let row = thead.insertRow();
            for (let i = 0; i < result.fields.length; ++i) {
                let key = result.fields[i].name;
                let th = document.createElement("th");
                let text = document.createTextNode(key);
                th.appendChild(text);
                row.appendChild(th);
            }
            // data insert
            for (let element of result.rows) {
                let row = table.insertRow();
                for (key in element) {
                    let cell = row.insertCell();
                    let text = document.createTextNode(element[key]);
                    cell.appendChild(text);
                }
            }
            body.appendChild(table);
        })
        .catch((err) =>
        {
            console.log(err);
        });
};

// let q = `SELECT * FROM "video_game_db"."Player" WHERE "Player_ID" = ${user_name};`;
// fetchTable(q, "mydiv7", "tabledata7");

// let q1 = `SELECT * FROM "video_game_db"."Purchase" WHERE "Player_ID" = ${user_name};`;
// fetchTable(q1, "mydiv4", "tabledata4");

// let q2 = `SELECT * FROM "video_game_db"."Achieves" WHERE "Player_ID" = ${user_name};`;
// fetchTable(q2, "mydiv5", "tabledata5");

// let q3 = `SELECT * FROM "video_game_db"."Season_Rewards" WHERE "Player_ID" = ${user_name};`;
// fetchTable(q3, "mydiv6", "tabledata6");

function show()
{
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}