import Header from '../components/sections/Header';
import Footer from '../components/sections/Footer';
import Profile from '../components/sections/Profile';
export default function AdminPage(){
  return (
    <>
      <Header />
      <main>
        <h1>Admin Dashboard</h1>
        <Profile />
      </main>
      <Footer />
    </>
  );
}