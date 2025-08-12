"use client";

import ModalScrollA from "./ModalScrollA";

export default function ModalScroll({ data }) {
  return (
    <>
      <ModalScrollA data={data.modalA} time={2} />
      <ModalScrollA data={data.modalA} time={4} />
      <ModalScrollA data={data.modalA} time={10} />
    </>
  );
}
