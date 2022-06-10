import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import React, { Component } from "react";
//import { Link } from "react-router-dom";
import Link from "next/link";

const cancelling = () => {
  this.setState({
    order_status: "Cancelled",
  });
};

export class index extends Component {
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
            <div className={styles.orderStatus}>
              Your order is being Processed
            </div>

            <Link href="/cancellOrder">
              <div className={styles.cancelOrder}>
                Click here to cancel the order
              </div>
            </Link>
          </div>
        </div>
      </body>
    );
  }
}

export default index;
