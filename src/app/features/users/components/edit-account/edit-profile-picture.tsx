"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form/form";
import { Input } from "@/components/ui/input";

import { uploadUserAvatar } from "../../actions/upload-user-avatar";

export type EditProfilePictureProps = {
  user_avatar_url: string | null;
  user_pk: string;
};

const editProfilePictureSchema = z.object({
  avatar: z.instanceof(FileList).optional(),
});

type EditProfilePictureFormValues = z.infer<typeof editProfilePictureSchema>;

export default function EditProfilePicture({ user_pk }: EditProfilePictureProps) {
  const form = useForm<EditProfilePictureFormValues>({
    resolver: zodResolver(editProfilePictureSchema),
  });

  const onSubmit = async (data: EditProfilePictureFormValues) => {
    const files = data.avatar;
    if (!files || files.length === 0) {
      toast.error("Please select a file");
      return;
    }
    const imageFormData = new FormData();
    Array.from(files).forEach((file) => {
      imageFormData.append("avatar", file);
    });

    const result = await uploadUserAvatar(user_pk, imageFormData);
    if (result?.error) {
      toast.error(result.error);
    }
    else {
      toast.success("Profile picture updated");
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <p className="text-sm text-gray-500">
          The profile picture is the picture that will be shown on your profile.
        </p>
        <FormField
          control={form.control}
          name="avatar"
          render={({ field: { onChange, value, ...field } }) => (
            <FormItem>
              <FormLabel className="sr-only">Profile picture</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files) {
                      onChange(files);
                    }
                  }}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" isLoading={form.formState.isSubmitting}>Update</Button>
      </form>
    </FormProvider>
  );
}
