import { Dispatch, ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { useAddMemberToTeam } from "@/hooks/queries/teamsQueries/queries";
import { useLocation } from "react-router-dom";
import LoadingSmall from "./loaders/LoadingSmall";

const AddMember = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-screen-sm">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
          </DialogHeader>
          <ProfileForm open={open} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent className="p-4">
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
        </DrawerHeader>

        <ProfileForm open={open} setOpen={setOpen} />

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

function ProfileForm({
  setOpen,
  open,
}: {
  setOpen: Dispatch<boolean>;
  open: boolean;
}) {
  const formScheme = z.object({
    email: z.string().email(),
  });
  const location = useLocation();
  const idTeam = location.pathname.split("/").pop();
  const { mutateAsync, data: response, isPending } = useAddMemberToTeam();

  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    mode: "onChange",
  });
  const OnSubmit = async (data: z.infer<typeof formScheme>) => {
    await mutateAsync({ emailUser: data.email, idTeam: idTeam ?? "" });
    if (response?.success) {
      setOpen(!open);
    }
  };
  return (
    <div>
      <div>
        <Form {...form}>
          <form
            className={cn("grid items-start gap-4")}
            onSubmit={form.handleSubmit(OnSubmit)}
          >
            <div className="grid gap-2">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {" "}
                      Ingresa el email de la persona que quieres agregar{" "}
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {
              <Button type="submit">
                {isPending ? <LoadingSmall /> : "Agregar"}
              </Button>
            }
          </form>
        </Form>
      </div>
    </div>
  );
}
export default AddMember;
