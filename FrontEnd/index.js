const fetchData = () =>
{
  const data = {
    query:
      "SELECT table_name FROM information_schema.tables WHERE table_schema='video_game_db' AND table_type='BASE TABLE';",
  };
  fetch(`http://localhost:3030/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((result2) =>
    {
      // console.log(result2);
      if (result2.err) {
        const body = document.getElementById("my-div");
        body.appendChild(document.createTextNode(JSON.stringify(result2.data)));
        return;
      }
      const result = result2.data;
      // for (let i = 0; i < result.rows.length; ++i) {
      //     let select_menu = document.getElementById("table-select");
      //     const newOption = document.createElement("option");
      //     const optionText = document.createTextNode(
      //         result.rows[i].table_name
      //     );
      //     newOption.appendChild(optionText);
      //     newOption.setAttribute("value", result.rows[i].table_name);
      //     select_menu.appendChild(newOption);
      // }
    })
    .catch((err) =>
    {
      console.log(err);
    });
};
fetchData();

const fetchTable = async (table_name, table_div, table_data) =>
{
  try {
    const response = await fetch(`http://localhost:3030/table/${table_name}`, {
      method: "GET",
    });
    const result2 = await response.json();
    // console.log(result2);
    if (result2.err) {
      const body = document.getElementById(`${table_div}`);
      body.appendChild(document.createTextNode(JSON.stringify(result2.data)));
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
  } catch (err) {
    console.log(err);
  }
};

const fetchTable2 = async (query, table_div, table_data) =>
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
        // body.appendChild(
        //     document.createTextNode(JSON.stringify(result2.data))
        // );
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

let q1 = `select "Game_ID", "Game_Name", "Discount_ID", "Percentage" ,"Start_Date", "End_Date" from "Discount" NATURAL JOIN "Game"`;
fetchTable2(q1, "mydiv1", "tabledata1");
let q2 = `SELECT "Tournament_ID", "Tournament_Name", "Game_Name", "Start_Date", "End_Date" FROM "Game" NATURAL JOIN "Tournament"`;
fetchTable2(q2, "mydiv2", "tabledata2");
let q3 = `SELECT "Game_Name", "Season_No", "F_Name", "L_Name", "Reward_Amount", "Date_Rewarded" FROM ("Season_Rewards" NATURAL JOIN "Game") NATURAL JOIN "Player";`;
fetchTable2(q3, "mydiv3", "tabledata3");