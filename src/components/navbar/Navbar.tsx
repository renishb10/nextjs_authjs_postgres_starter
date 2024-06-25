import Container from '@/components/common/Container';
import Logo from '@/components/navbar/Logo';
import DarkMode from '@/components/navbar/DarkMode';

const Navbar = () => {
  return (
    <nav className="border-b">
      <Container className="flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap gap-4 py-8">
        <Logo />
        <div className="flex gap-4 items-center">
          <DarkMode />
          {/* <LinksDropdown /> */}
        </div>
      </Container>
    </nav>
  );
};
export default Navbar;
