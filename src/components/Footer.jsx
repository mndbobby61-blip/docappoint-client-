import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaTwitter,
}
 from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="px-6 py-16 bg-blue-500 dark:bg-[#020817] transition-all duration-500">

            <div className="max-w-7xl mx-auto rounded-[32px] p-10 md:p-14 shadow-2xl bg-white dark:bg-[#0f172a] border border-transparent dark:border-white/10 transition-all duration-500">

                {/* Top Section */}
                <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">

                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-5">

                            <img
                                src="/assets/logo.jpg"
                                alt="DocAppoint Logo"
                                className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                            />

                            <div>
                                <h1 className="text-2xl font-bold text-black dark:text-white">
                                    DocAppoint
                                </h1>

                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Smart Healthcare Platform
                                </p>
                            </div>
                        </div>

                        <p className="leading-7 mb-6 text-gray-500 dark:text-gray-400">
                            Book appointments with trusted doctors, manage
                            your health records, and get quality healthcare
                            anytime, anywhere.
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-4">

                            <SocialIcon
                                bg="bg-blue-100 dark:bg-white/10"
                                text="text-blue-600 dark:text-white"
                                hover="hover:bg-blue-600"
                            >
                                <FaFacebookF />
                            </SocialIcon>

                            <SocialIcon
                                bg="bg-pink-100 dark:bg-white/10"
                                text="text-pink-500 dark:text-white"
                                hover="hover:bg-pink-500"
                            >
                                <FaInstagram />
                            </SocialIcon>

                            <SocialIcon
                                bg="bg-sky-100 dark:bg-white/10"
                                text="text-sky-500 dark:text-white"
                                hover="hover:bg-sky-500"
                            >
                                <FaTwitter />
                            </SocialIcon>

                            <SocialIcon
                                bg="bg-blue-100 dark:bg-white/10"
                                text="text-blue-700 dark:text-white"
                                hover="hover:bg-blue-700"
                            >
                                <FaLinkedinIn />
                            </SocialIcon>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <FooterLinks
                        title="Quick Links"
                        links={[
                            "Home",
                            "Find Doctors",
                            "Appointments",
                            "Health Blog",
                        ]}
                    />

                    {/* Services */}
                    <FooterLinks
                        title="Services"
                        links={[
                            "Online Consultation",
                            "Emergency Care",
                            "Lab Tests",
                            "Medicine Delivery",
                        ]}
                    />

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold mb-5 text-gray-900 dark:text-white">
                            Contact Us
                        </h3>

                        <ul className="space-y-4 text-gray-500 dark:text-gray-400">
                            <li>📍 Dhaka, Bangladesh</li>
                            <li>📞 +880 1234-567890</li>
                            <li>✉️ support@docappoint.com</li>
                            <li>🕒 24/7 Support Available</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 pt-6 border-t border-gray-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 dark:text-gray-400">

                    <p className="text-sm">
                        © 2025 DocAppoint. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6 text-sm flex-wrap">
                        <a href="#" className="hover:text-blue-500 duration-300">
                            Privacy Policy
                        </a>

                        <a href="#" className="hover:text-blue-500 duration-300">
                            Terms & Conditions
                        </a>

                        <a href="#" className="hover:text-blue-500 duration-300">
                            Cookie Policy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

/* Social Icon */
function SocialIcon({ children, bg, text, hover }) {
    return (
        <a
            href="#"
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:text-white hover:scale-110 ${bg} ${text} ${hover}`}
        >
            {children}
        </a>
    );
}

/* Footer Links */
function FooterLinks({ title, links }) {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-5 text-gray-900 dark:text-white">
                {title}
            </h3>

            <ul className="space-y-4 text-gray-500 dark:text-gray-400">
                {links.map((link, index) => (
                    <li key={index}>
                        <a
                            href="#"
                            className="hover:text-blue-500 duration-300"
                        >
                            {link}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}