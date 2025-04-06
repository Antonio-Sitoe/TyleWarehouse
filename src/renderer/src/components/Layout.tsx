import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Home, Package, Users, ShoppingCart, Boxes, BarChart3, Settings, Truck as Truck2 } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType;
}

const navItems: NavItem[] = [
  { title: "Dashboard", href: "/", icon: Home },
  { title: "Products", href: "/products", icon: Package },
  { title: "Suppliers", href: "/suppliers", icon: Truck2 },
  { title: "Customers", href: "/customers", icon: Users },
  { title: "Sales", href: "/sales", icon: ShoppingCart },
  { title: "Stock", href: "/stock", icon: Boxes },
  { title: "Reports", href: "/reports", icon: BarChart3 },
  { title: "Settings", href: "/settings", icon: Settings },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r bg-gray-50/40 dark:bg-gray-900/40">
        <div className="p-6">
          <h2 className="text-2xl font-bold tracking-tight">Inventory Pro</h2>
        </div>
        <ScrollArea className="flex-1 px-3">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                    isActive && "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                  )
                }
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </NavLink>
            ))}
          </nav>
        </ScrollArea>
      </aside>

      {/* Mobile Header & Sheet */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <div className="flex lg:hidden border-b">
          <div className="flex items-center gap-2 p-4">
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <h2 className="text-lg font-semibold">Inventory Pro</h2>
          </div>
        </div>
        <SheetContent side="left" className="w-64 p-0">
          <div className="p-6">
            <h2 className="text-2xl font-bold tracking-tight">Inventory Pro</h2>
          </div>
          <ScrollArea className="h-[calc(100vh-5rem)]">
            <nav className="flex flex-col gap-2 p-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                      isActive && "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                    )
                  }
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </NavLink>
              ))}
            </nav>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;