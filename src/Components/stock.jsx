import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Cookies from "js-cookie";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";

export default function Stock() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
    if (Cookies.get("mode") == "light") {
      document.body.className = "light-mode";
    } else {
      document.body.className = "dark-mode";
    }
  }, []);

  return (
    <div className="siderow">
      <div className="sidecol1">
        <Sidebar />
      </div>
      <div className="sidecol2">
        <div className={`welcome-animation ${show ? "show" : ""}`}>
          <h1
            className="dashboard"
            style={{
              textAlign: "left",
              paddingTop: "40px",
              fontWeight: "bolder",
            }}
          >
            Inventory
          </h1>

          <div
            class="relative overflow-x-auto shadow-md sm:rounded-lg"
            style={{ borderRadius: 0, marginTop: "30px" }}
          >
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead
                class="uppercase"
                id="tablehead"
                style={{ padding: "10px", color: "#313a50" }}
              >
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Id
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Street
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Available Stock
                  </th>
                </tr>
              </thead>
              <tbody id="tablebody">
                <tr class="border-b">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium whitespace-nowrap "
                  >
                    01
                  </th>
                  <td class="px-6 py-4">
                    1234 Alpenstrasse, 3012 Bern, Switzerland
                  </td>
                  <td class="px-6 py-4">20</td>
                </tr>
                <tr class="border-b" style={{ backgroundColor: "#FAA0A0" }}>
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium whitespace-nowrap "
                  >
                    02
                  </th>
                  <td class="px-6 py-4">Bahnhofstrasse 28, 8001 Zürich</td>
                  <td class="px-6 py-4">10</td>
                </tr>
                <tr class="border-b">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium whitespace-nowrap "
                  >
                    03
                  </th>
                  <td class="px-6 py-4">Bahnhofstrasse 28, 8001 Zürich</td>
                  <td class="px-6 py-4">10</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
