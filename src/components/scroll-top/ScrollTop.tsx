"use client";
import { useEffect, useState } from "react";

import { usePathname } from "next/navigation";
import { DrawerComponent, ScrollTopComponent, StickyComponent, ToggleComponent } from "@/_metronic/assets/ts/components";
import { KTIcon } from "@/_metronic/helpers";

export function ScrollTop() {
  const pathname = usePathname();
  const [initialized, setInintialized] = useState(false);

  const pluginsReinitialization = () => {
    setTimeout(() => {
      StickyComponent.reInitialization();
      setTimeout(() => {
        ToggleComponent.reinitialization();
        DrawerComponent.reinitialization();
      }, 70);
    }, 140);
  };

  const scrollTop = () => {
    ScrollTopComponent.goTop();
  };

  const updateHeaderSticky = () => {
    const stickyHeader = document.body.querySelectorAll(
      `[data-kt-sticky-name="header"]`
    );
    if (stickyHeader && stickyHeader.length > 0) {
      const sticky = StickyComponent.getInstance(
        stickyHeader[0] as HTMLElement
      );
      if (sticky) {
        sticky.update();
      }
    }
  };

  useEffect(() => {
    if (!initialized) {
      setInintialized(true);
    } else {
      pluginsReinitialization();
    }

    updateHeaderSticky();
    setTimeout(() => {
      scrollTop();
    }, 0);
  }, [initialized, pathname]);

  return (
    <div id="kt_scrolltop" className="scrolltop" data-kt-scrolltop="true">
      <KTIcon iconName="arrow-up" />
    </div>
  );
}
