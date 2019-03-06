import React from "react";

const getViewBox = name => {
    switch (name) {
        case "phone":
            return "0 0 32 33";
        case "message":
            return "0 0 38 34";
        case "envelope":
            return "0 0 40 26";
        case "trash":
            return "0 0 13.5 17.5";
        case "wifi":
            return "0 0 12 9";
        case "trx":
            return "0 0 236.1 271";
        default:
            return "0 0 32 32";
    }
};

const styles = {
    st0: {fill:'none',stroke:'#ffffff',strokeWidth:15,strokeLinecap:'round',strokeMiterlimit:10},
    st1: {fill:'none',stroke:'#ffffff',strokeWidth:17,strokeLinecap:'round',strokeMiterlimit:10},

}

const TrxIcon = ({
                     name = "",
                     style = {},
                     fill = "#ffffff",
                     viewBox = "0 0 236.1 271",
                     width = "100%",
                     className = "",
                     height = "100%"
                 }) => (
    <svg
        width={width}
        style={style}
        height={height}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox='0 0 236.1 271'
        xmlnsXlink="http://www.w3.org/1999/xlink"
    >
        <line style={styles.st0} x1="3.7" y1="4.7" x2="115.3" y2="134"/>
        <line style={styles.st0} x1="114.6" y1="134" x2="100.2" y2="267.5"/>
        <line style={styles.st1} x1="3.5" y1="3.5" x2="192" y2="48.7"/>
        <line style={styles.st0} x1="192" y1="49.5" x2="114.6" y2="134"/>
        <line style={styles.st1} x1="232.6" y1="76.8" x2="101" y2="267.5"/>
        <line style={styles.st0} x1="115.3" y1="134" x2="231.9" y2="76.8"/>
        <line style={styles.st1} x1="192" y1="48.7" x2="232.6" y2="76.8"/>
        <line style={styles.st0} x1="2.8" y1="4.5" x2="100.2" y2="268.5"/>
    </svg>
);

export default TrxIcon;