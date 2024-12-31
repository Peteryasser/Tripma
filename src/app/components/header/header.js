"use client";

import React, {useEffect, useState} from 'react';
import Image from "next/image";

import logo from '@/assets/logo.svg';
import menu from '@/assets/menu.svg';
import close from '@/assets/whiteClose.png';
import classes from './header.module.css';
import Link from "next/link";
import {usePathname} from "next/navigation";
import SignUp from "@/app/components/sign-up/sign-up";
import profile from "@/assets/user.jpg"
import SignIn from '../sign/sign';

function Header(props) {

    const [menuOpen, setMenuOpen] = useState(false);
    const [signUp, setSignUp] = useState(false);
    const [signIn, setSignIn] = useState(false);
    const [isMessage, setIsMessage] = useState(true);
    const [startMargin, setStartMargin] = useState('64px');

    const path = usePathname();
    const [user, setUser] = useState(null);
    const closeSignup = () => setSignUp(false);
    const closeSignIn = () => setSignIn(false);

    useEffect(() => {
        async function fetchUser() {
            //get user from API
            const userDate = null
            setUser(userDate); 
        }
        fetchUser();
    }, []);

    function closeMessage(){
        setIsMessage(false);
        setStartMargin('0px')
    }
    return (
        <>
        {isMessage && (
            <div className={classes.openMessage}>
                <span className={classes.message}>
                    Join Tripma today and save up to 20% on your flight using code TRAVEL at checkout. Promotion valid for new users only.
                </span>
                <Image
                    className={classes.close}
                    src={close}
                    alt="Close"
                    onClick={closeMessage}
                />
            </div>
        )}
        <div className={classes.navbar} style={{marginTop: startMargin}}>
            <header className={classes.header}>
                <div>
                    {menuOpen ? (
                        <Image className={classes.menu} src={close} alt={'menu'} onClick={() => setMenuOpen(false)}/>
                    ) : (
                        <Image className={classes.menu} src={menu} alt={'menu'} onClick={() => {
                            setMenuOpen(true);
                            setSignUp(false);
                            setSignIn(false);

                        }}/>
                    )}
                    <Link href="/" className={classes.logo}>
                        <Image className={classes.logo} src={logo} alt={'Tripma'} />
                    </Link>
                </div>
                <div className={classes.buttons}>
                    <div className={classes.routs}>
                        <Link  className={path === '/' ? classes.active : classes.notActive} href="/">Flights</Link>
                        <Link className={path === '/hotels' ? classes.active : classes.notActive} href="/hotels">Hotels</Link>
                        <Link className={path === '/packages' ? classes.active : classes.notActive} href="/packages">Packages</Link>
                        {user ? (
                            <div className={classes.user}>
                                <Image src={profile} alt="user" width={50} />
                            </div>
                        ) : (
                            <>
                                <button className={classes.signIn } onClick={() => setSignIn(true)}>Sign in</button>
                                {
                                    signIn ? <SignIn exit={closeSignIn}/> : null
                                }
                                <button className={classes.signUp} onClick={() => setSignUp(true)}>Sign up</button>
                                {
                                    signUp ? <SignUp exit={closeSignup}/> : null
                                }
                            </>
                        )}

                    </div>
                </div>
            </header>
            {
                !signUp && menuOpen  ? <div className={classes.dropMenu}>
                    <Link className={path === '/' ? classes.active : classes.notActive} href="/">Flights</Link>
                    <Link className={path === '/hotels' ? classes.active : classes.notActive}
                          href="/hotels">Hotels</Link>
                    <Link className={path === '/packages' ? classes.active : classes.notActive}
                          href="/packages">Packages</Link>
                </div> : null
            }

        </div>
        </>
    );
}

export default Header;
