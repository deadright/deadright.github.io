'use strict';

const clss = {
    cldsc: "pnl__cl",
    clnum: "pnl__cl--num",
    rwupg: "pnl__rw buyable",
    rwdsc: "pnl__rw",
    pg1: "page1",
}

const dscr = {
    story1: "One day, points appeared in the world.</br>Little, funny things. Taste like frobles.",
    upg1: "Start collecting points.</br>\
            (Around the house, in the yard—</br>there's one in the mailbox.)",
    upg2: "Hire point sniffer cats</br>\
                            We tried getting dogs but they just ate the points",
    zupg1: "Purchase charger"
}

window.onload = () => {
    remallofcl(".init");
    let page = build(document.body, "page p1");
    let panel = build(page, "pnl prs");
    let pnlupg = build(panel, "pnl__upg");

    rw(pnlupg, `${clss.rwdsc} ${clss.pg1}`, "Points", "0");
    rw(pnlupg, `${clss.rwdsc} ${clss.pg1}`, "Pts/sec", "0");
    rw(pnlupg, `${clss.rwupg} ${clss.pg1} upg1`, dscr.upg1, ".1s", "free");

    let pnlz = hid(build(panel, "pnl__z"), true);
    let pnlupgz = build(pnlz, "pnl__upg");
    let charger = build(pnlz, "pnl__chrg");
    build(charger, "chrg__btn", "0%");

    rw(pnlupgz, `${clss.rwdsc} ${clss.pg1}`, "Z-matter", "0");
    rw(pnlupgz, `${clss.rwdsc} ${clss.pg1}`, "Z-mt/charge", "0");
    rw(pnlupgz, `${clss.rwupg} ${clss.pg1} zupg1`, dscr.zupg1, "10pts");

    build(panel, "pnl__str", dscr.story1);

    let tabbar = build(panel, "pnl__tabs prs");
    build(tabbar, "tab tab-pts prs", "P");
    build(tabbar, "tab tab-z prs", "Z");
    build(tabbar, "tab prs", "I");
    build(tabbar, "tab prs", "W");
    build(tabbar, "tab prs", "D");

    onClick((e) => { hid(pnlupg, true); hid(pnlz, false); }, select(".tab-z"));
    onClick((e) => { hid(pnlz, true); hid(pnlupg, false); }, select(".tab-pts"));
    onClickRunOnce((e) => {
            // remcl("buyable", e.currentTarget);
            // adcl("bought", e.currentTarget);
            purchase(e.currentTarget);
            setTimeout(()=> {
                rw(pnlupg, `${clss.rwupg} ${clss.pg1} upg2`, dscr.upg2, "+.1s", "5pts");
            }, 1000);
        }, select(".upg1"));
}
const build = (root, cls, cnt) => {
    return compose(append(root), adhtm(cnt), adclC(cls), genel("div"))();
}
const bldc = (root, cls, cnt) => x => {
    return compose(append(root), adhtm(cnt), adclC(cls), genel("div"))();
}
const bldpss = (cls, cnt) => root => {
    compose(append(root), adhtm(cnt), adclC(cls), genel("div"))();
    return root;
}
const rw = (prt, cls, dsc, ...numbers) => {
    return compose(bldall(clss.clnum, numbers), bldpss(clss.cldsc, dsc), bldc(prt, cls))();
}
const bldall = (cls, arr) => prt => arr.forEach(el => build(prt, cls, el));
const purchase = (el) => {
    remcl("buyable", el);
    adcl("bought", el);
}