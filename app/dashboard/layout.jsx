import Nav from "@/components/Nav";

export const metadata = {
  title: "Music Creator",
  description: "Music Creator by Johannes Eriksson",
};

export default function layout({ children }) {
  return (
    <>
      <Nav />
      {children}
    </>
  );
}
