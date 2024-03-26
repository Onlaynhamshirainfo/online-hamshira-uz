import React from "react";

export default function Stars({ count }) {
  return (
    <span className="flex flex-row items-center gap-1">
      {Array(count).fill().map((p, i) => {
        return (
          <svg
            width="16"
            key={i}
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.2448 5.79412L8.88651 1.32448C8.61856 0.447178 7.3804 0.447178 7.12168 1.32448L5.75417 5.79412H1.64238C0.746098 5.79412 0.376499 6.94852 1.10646 7.46567L4.46982 9.86671L3.14849 14.124C2.88053 14.9828 3.87846 15.6754 4.58994 15.1305L7.99948 12.5448L11.409 15.1398C12.1205 15.6846 13.1184 14.992 12.8505 14.1332L11.5292 9.87595L14.8925 7.4749C15.6225 6.94852 15.2529 5.80336 14.3566 5.80336H10.2448V5.79412Z"
              fill="#FCB823"
            />
          </svg>
        );
      })}
    </span>
  );
}
