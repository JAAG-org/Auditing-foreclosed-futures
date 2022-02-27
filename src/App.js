import React, { useState } from 'react';
import Modal from 'react-modal';
import './App.css';

const App = () => {
  const [isModalOpen, setModalOpen] = useState(false)

  return (
    <div className="App">
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="About"
        className="about-modal"
      >
        <h1> About </h1>
      </Modal>

      <h1 className="header"> Auditing foreclosed futures+ </h1>
      <h3 className="subheader"> Open Reception: 20 March 2022, 4PM++ </h3>

      <table className="table-files">
        <tr className="table-line">
          <th></th>
          <th className="table-header">Name</th>
          <th className="table-header">Last modified</th>
          <th className="table-header">Size</th>
          <th className="table-header">Description</th>
        </tr>
        <tr>
          <td>🆙</td>
          <td className="table-row-folder">Parent Directory</td>
          <td></td>
          <td>-</td>
          <td></td>
        </tr>
        <tr>
          <td>📈</td>
          <td className="table-row-folder">Collecting lost dreams as if it will never disappear (Giang)/</td>
          <td></td>
          <td>-</td>
          <td></td>
        </tr>
        <tr>
          <td>👀</td>
          <td className="table-row-folder">“Your Next Life in Thailand" (Nanut)/</td>
          <td></td>
          <td>-</td>
          <td></td>
        </tr>
        <tr className="table-line">
          <td>🌲</td>
          <td className="table-row-folder">Thailand lose dream (Tewprai)/</td>
          <td></td>
          <td>-</td>
          <td></td>
        </tr>
      </table>

      <p className="about" onClick={() => setModalOpen(true)}> About </p>
      <p className="artists"> Artists </p>
    </div>
  );
}

export default App;
