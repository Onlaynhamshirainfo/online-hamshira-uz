import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
export default function SwalModal({ title }) {
  const MySwal = withReactContent(Swal);

  return MySwal.fire({
    title: <p>{title}</p>,
    icon: "success",
    position: "center",
    timer: 3000,
    showConfirmButton: false,
  });

  //   return <></>;
}
