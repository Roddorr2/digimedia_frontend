/*
"use client";

import ModalScrollA from "./ModalScrollA";

export default function ModalScroll({ data }) {
  return (
    <>
      <ModalScrollA
        data={data.modalA}
        time={1}
      />
    </>
  );
}
*/


"use client";

import ModalScrollA from "./ModalScrollA";

export default function ModalScroll({ data }) {
  return (
    <ModalScrollA
      data={data.modalA}
      //time={14}
      time={2}
    />
  );
}

