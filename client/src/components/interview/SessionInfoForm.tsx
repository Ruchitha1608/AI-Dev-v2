import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import SkillsInput from "./SkillsInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { jobRoleSchema } from "@/types/InterviewData";
import { Card, CardContent } from "../ui/card";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useInterviewStore from "@/store/interviewStore";
import { useUser } from "@clerk/clerk-react";

const formSchema = z.object({
  yearsOfExperience: z
    .number()
    .min(0, "Experience must be a positive number")
    .max(50, "Experience cannot exceed 50 years"),
  jobRole: jobRoleSchema,
  skills: z.array(z.string()).nonempty("At least one skill is required"),
});

export type { formSchema }

function SessionInfoForm() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      yearsOfExperience: 0,
      jobRole: "front-end",
      skills: []
    }
  })

  const navigate = useNavigate()
  const { setCandidate } = useInterviewStore()

  const user = useUser().user

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setCandidate({
      email: user?.primaryEmailAddress?.emailAddress || null,
      name: user?.username || null,
      yearsOfExperience: values.yearsOfExperience,
      jobRole: values.jobRole,
      skills: values.skills
    })
    navigate(`/interview/${Date.now()}`)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card
          className="dark:bg-zinc-800 dark:text-neutral-300 py-10 flex items-center justify-center cursor-pointer transition duration-300 hover:scale-[103%] hover:shadow-lg hover:bg-neutral-100 dark:hover:bg-zinc-700/70"
        >
          <CardContent className="flex p-0 items-center justify-center h-full">
            <Plus size={32} className="text-neutral-300" />
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Start session</DialogTitle>
          <DialogDescription>
            Fill the form below to start a new session
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="jobRole"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Role</FormLabel>
                  <FormControl>
                    <Select form="jobRole" value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="">
                        <SelectValue placeholder="Theme" />
                      </SelectTrigger>
                      <SelectContent>
                        {jobRoleSchema.options.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="yearsOfExperience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Years of Experience"
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills</FormLabel>
                  <FormControl>
                    <SkillsInput value={field.value || []} onChange={field.onChange} />
                  </FormControl>
                  <FormDescription>
                    Enter at least three skills
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default SessionInfoForm