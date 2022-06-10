import React, { Component } from "react";
import styles from "../styles/Home.module.css";
//import { Link } from "react-router-dom";
import Link from "next/link";
import anxios from "axios";

export class cancellOrder extends Component {
  render() {
    return (
      <body>
        <div className={styles.MainOne}>
          <div className={styles.container}>
            <div className={styles.Left}>
              <div className={styles.searchBar}>
                <div placeholder="Search" className={styles.input} />
              </div>
            </div>
            <div className={styles.center}>
              <div className={styles.Logo}>Rabbit</div>
            </div>
          </div>
          <div className={styles.box}>
            <div className={styles.orderStatus}>Your order is cancelled</div>
            <img src={cart} className={styles.img}></img>
          </div>
        </div>
      </body>
    );
  }
}

export default index;
