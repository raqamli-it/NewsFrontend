import styled from 'styled-components';
import { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { Dropdown } from '../Navbar/styled';
import DropdownItem from '../cotegroys/Dropdown';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaTiktok, FaTelegram, FaLinkedin} from 'react-icons/fa'; // react-icons import
import { useNavigate } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: #f8f9fa;
  padding: 20px 0;
  border-top: 1px solid #000000;
  height: 10vw;
`;
const FotterIcon =styled.div`
    display: flex;
    padding: 0 25px;
    flex-wrap: wrap;
`
const IconText =styled.p`
    padding: 4px 10px;
    background-color: black;
    color: white;
    margin-left: 5px;
    font-size: 18px;
    font-weight: bold;
    /* transform: rotate(-5deg); */
`
const FooterLinks = styled.div`
  display: flex;
  padding: 0 25px;
  margin-bottom: 15px;
  width: 80%;
  justify-content: space-between;
  flex-wrap: wrap;
  a {
    margin: 0 25px;
    text-decoration: none;
    color: #000;
    font-size: 14px;
    font-weight: bold;
    &:hover {
      text-decoration: underline;
    }

  }
`;

const SocialLinks = styled.div`
  display: flex;
  padding: 0 25px;
  margin-bottom: 15px;
  justify-content: space-between;
  width: 50%;
  flex-wrap: wrap;
  a {
    margin: 0 10px;
    font-size: 20px;
    color: #000;
    
    &:hover {
      color: #007bff;
    }
  }
`;
const Links = styled.a`
  text-decoration: none;
  color: #000;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Footer = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { data: categories, loading, error } = useFetch("/category/");
  const handleCategorySelect = (category) => {
    // Directly navigate to the URL with the selected category as a query parameter
    navigate(`/news?category=${encodeURIComponent(category)}`);
    setDropdownOpen(false);
    setMenuOpen(false);
  };
  return (
    <FooterContainer>
    <FotterIcon>
    <IconText>M</IconText>
    <IconText>I</IconText>
    <IconText>L</IconText>
    <IconText>L</IconText>
    <IconText>I</IconText>
    <IconText>Y</IconText>
    <IconText style={{marginLeft:'20px'}}>2</IconText>
    <IconText>4</IconText>
    </FotterIcon>
      <FooterLinks>
        <Links style={{fontSize:'18px', marginLeft:'0'}} href="/sud">Sud</Links>
        <Links style={{fontSize:'18px'}} href="/jurnalistik">Juranlistik Jamiyat</Links>
        <Links style={{fontSize:'18px'}} href="/yangiliklar">Yangiliklar</Links>
        <div
            className="NewsNavDrp"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <Links to="#">News</Links>
            {dropdownOpen && (
              <Dropdown style={{height:'6vw'}}>
                {loading ? (
                  <div>Loading...</div>
                ) : error ? (
                  <div>Error occurred</div>
                ) : (
                  categories.map((cat) => (
                    <DropdownItem
                      key={cat.id}
                      id={cat.id}
                      title={cat.name_uz}
                      onClick={() => handleCategorySelect(cat.name_uz)} // Directly handle category selection
                    />
                  ))
                )}
              </Dropdown>
            )}
          </div>
      </FooterLinks>
      <SocialLinks>
        <span style={{marginTop:'2px', fontWeight:'bold'}}>Follow Milliy 24 on:</span>
        <Links href="#" aria-label="Facebook">
          <FaFacebook />
        </Links>
        <Links href="#" aria-label="Instagram">
          <FaInstagram />
        </Links>
        <Links href="#" aria-label="Telegram">
          <FaTelegram />
        </Links>
        <Links href="#" aria-label="Twitter">
          <FaTwitter />
        </Links>
        <Links href="#" aria-label="LinkEdin">
          <FaLinkedin />
        </Links>
        <Links href="#" aria-label="TikTok">
          <FaTiktok />
        </Links>
        <Links href="#" aria-label="YouTube">
          <FaYoutube />
        </Links>
      </SocialLinks>
    </FooterContainer>
  );
};

export default Footer;
