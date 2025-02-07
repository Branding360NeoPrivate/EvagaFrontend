import { companyDetails } from "../../utils/companyDetails";
import { footerMenuItems } from "../../utils/footerMenuList";
import { Link } from "react-router-dom";
function Footer() {
  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-purpleSecondary text-backgroundOffWhite pb-10 font-semibold w-full mt-6">
      {/* Back to Top */}
      <div
        onClick={backToTop}
        className=" w-full h-[50px] flex justify-center items-center text-center mb-6
         bg-purpleHighlight hover:bg-purple-700 cursor-pointer"
      >
        Back to Top
      </div>
      <div className="container mx-auto lg:px-6 hidden md:block ">
        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          {/* Column 1 */}
          <div>
            <ul className="space-y-4">
              {footerMenuItems.leftMenu.map((item, index) => (
                <li key={index}>
                  <Link to={item.path || "#"} className=" text-sm">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Column 2 */}
          <div>
            <h3 className="mb-2 font-semibold">Connect With Us</h3>
            <div className="flex flex-col  gap-2">
              <a
                href="https://www.facebook.com/share/15UhbdRWh8/?mibextid=wwXIfr "
                target="_blank"
                aria-label="Facebook"
                className="text-sm medium"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com/evagaentertainment/?igsh=MmcwdjJzMHUwd3k2&utm_source=qr"
                target="_blank"
                aria-label="Instagram"
                className="text-sm medium"
              >
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/company/evaga-entertainment"
                target="_blank"
                aria-label="X"
                className="text-sm medium"
              >
                Linkedin
              </a>
              <a
                href="https://whatsapp.com/channel/0029VaWXX585fM5adzGAzC1C"
                target="_blank"
                aria-label="X"
                className="text-sm medium"
              >
                WhatsApp
              </a>{" "}
              <a
                href="https://x.com/EvagaOfficial"
                target="_blank"
                aria-label="X"
                className="text-sm medium"
              >
                Twitter
              </a>
              <a
                href="mailto:info@evagaentertainment.com"
                aria-label="Email"
                className="text-sm medium"
              >
                Email Support
              </a>
            </div>
          </div>
          <div>
            <ul className="space-y-4">
              {footerMenuItems.midMenu.map((item, index) => (
                <li key={index}>
                  <a href={item.path || "#"} className="hover:text-highlight">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Column 4 */}
          <div>
            <ul className="space-y-4">
              {footerMenuItems.rightMenu.map((item, index) => (
                <li key={index}>
                  <a href={item.path || "#"} className="hover:text-highlight">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-sm">
              <h3>Registered Office Address</h3>
              <p className=" lg:w-[250px]">{companyDetails.address}</p>
              <p>{companyDetails.cinNumber}</p>
            </div>
          </div>
        </div>
        {/* Footer Bottom */}
        <div className="text-center mt-6 text-sm">
          <p>© 2024 {companyDetails.fullName} All rights reserved</p>
        </div>
      </div>
      <div className="container mx-auto px-5 md:hidden grid grid-cols-2 gap-y-5 justify-center items-start ">
        {/* Footer Links */}
        <div className=" gap-6 text-sm">
          <div>
            <ul className="space-y-4">
              {footerMenuItems.leftMenu.map((item, index) => (
                <li key={index}>
                  <a href={item.path || "#"} className=" text-sm">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className=" text-sm space-y-4">
          <ul className="space-y-4">
            {footerMenuItems.midMenu.map((item, index) => (
              <li key={index}>
                <a href={item.path || "#"} className="hover:text-highlight">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="space-y-4">
            {footerMenuItems.rightMenu.map((item, index) => (
              <li key={index}>
                <a href={item.path || "#"} className="hover:text-highlight">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className=" col-span-2 flex-col flex justify-start items-start gap-4 text-sm">
          <h3 className=" font-semibold">Connect With Us</h3>
          <div className="flex flex-col  gap-2">
              <a
                href="https://www.facebook.com/share/15UhbdRWh8/?mibextid=wwXIfr "
                target="_blank"
                aria-label="Facebook"
                className="text-sm medium"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com/evagaentertainment/?igsh=MmcwdjJzMHUwd3k2&utm_source=qr"
                target="_blank"
                aria-label="Instagram"
                className="text-sm medium"
              >
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/company/evaga-entertainment"
                target="_blank"
                aria-label="X"
                className="text-sm medium"
              >
                Linkedin
              </a>
              <a
                href="https://whatsapp.com/channel/0029VaWXX585fM5adzGAzC1C"
                target="_blank"
                aria-label="X"
                className="text-sm medium"
              >
                WhatsApp
              </a>{" "}
              <a
                href="https://x.com/EvagaOfficial"
                target="_blank"
                aria-label="X"
                className="text-sm medium"
              >
                Twitter
              </a>
              <a
                href="mailto:info@evagaentertainment.com"
                aria-label="Email"
                className="text-sm medium"
              >
                Email Support
              </a>
            </div>
        </div>
        <div className=" col-span-2">
          <div className="mt-4 text-sm">
            <h3>Registered Office Address</h3>
            <p className=" lg:w-[250px]">{companyDetails.address}</p>
            <p>{companyDetails.cinNumber}</p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-6 text-sm col-span-2">
          <p>© 2024 {companyDetails.fullName} All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
