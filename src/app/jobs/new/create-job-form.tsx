"use client";

import LoadingButton from "@/components/loading-button";
import LocationInput from "@/components/location-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Select from "@/components/ui/select";
import { jobTypes, locationTypes } from "@/lib/job-types";
import { createJobSchema, CreateJobValues } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { draftToMarkdown } from "markdown-draft-js";
import { SubmitHandler, useForm } from "react-hook-form";
import RichTextEditor from "./../../../components/rich-text-editor";
import { CreateJob } from "./actions";

const CreateJobForm = () => {
  const form = useForm<CreateJobValues>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      title: "",
      companyName: "",
      applicationUrl: "",
      applicationEmail: "",
      description: "",
      location: "",
      salary: "",
    },
  });

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    trigger,
    setFocus,
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<CreateJobValues> = async (values) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      await CreateJob(formData);
    } catch {
      alert("Something went wrong, Please try again");
    }
  };

  return (
    <div className="space-y-6 rounded-lg border p-4">
      <div>
        <h2 className="text-xl font-semibold">Job details</h2>
        <p className="text-muted-foreground">
          Provide a job description and details
        </p>
      </div>
      <Form {...form}>
        <form
          noValidate
          className="space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Frontend Developer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Select defaultValue="" {...field}>
                    <option hidden value={""}>
                      Select an option
                    </option>
                    {jobTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="companyLogo"
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            render={({ field: { value, ...fieldValues } }) => (
              <FormItem>
                <FormLabel>Company logo</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    {...fieldValues}
                    onChange={(e) => fieldValues.onChange(e.target.files?.[0])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="locationType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Select
                    defaultValue=""
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      if (e.currentTarget.value === "Remote") {
                        trigger("location");
                      }
                    }}
                  >
                    <option hidden value={""}>
                      Select an option
                    </option>
                    {locationTypes.map((locType) => (
                      <option key={locType} value={locType}>
                        {locType}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Office Location</FormLabel>
                <FormControl>
                  <LocationInput
                    placeholder="Search for location."
                    onLocationSelected={field.onChange}
                    ref={field.ref}
                  />
                </FormControl>
                {watch("location") && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setValue("location", "", { shouldValidate: true })
                      }
                    >
                      <X size={20} />
                      <span className="sr-only">Delete city</span>
                    </button>
                    <span>{watch("location")}</span>
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-2">
            <Label htmlFor="applicationEmail">How to apply</Label>
            <div className="flex items-center">
              <FormField
                control={control}
                name="applicationEmail"
                render={({ field }) => (
                  <FormItem className="grow self-start">
                    <FormControl>
                      <div className="flex items-center">
                        <Input
                          id="applicationEmail"
                          type="email"
                          placeholder="Email"
                          {...field}
                        />
                        <span className="mx-2">Or</span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="applicationUrl"
                render={({ field }) => (
                  <FormItem className="grow self-start">
                    <FormControl>
                      <Input
                        placeholder="Website"
                        type="url"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          trigger("applicationEmail");
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <Label onClick={() => setFocus("description")}>
                  Description
                </Label>
                <FormControl>
                  <RichTextEditor
                    ref={field.ref}
                    onChange={(draft) => {
                      const markdown = draftToMarkdown(draft);
                      field.onChange(markdown);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="salary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salary</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton type="submit" pending={isSubmitting}>
            Submit
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
};

export default CreateJobForm;
