// components/SidebarEditor.tsx
"use client";
import { Collapse, Input, Button, Tag, Tooltip, DatePicker } from 'antd';
import { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

const { Panel } = Collapse;
const { RangePicker } = DatePicker;

export default function SidebarEditor() {

    const { resume, updateField, addSkill, removeSkill, addProject, removeProject, addEducation, removeEducation, addAchievement, removeAchievement } = useResume();
    const [skillInput, setSkillInput] = useState('');
    const [projectInput, setProjectInput] = useState({ title: '', desc: '', tech: '', link: '' });
    const [educationInput, setEducationInput] = useState({ institute: '', degree: '', year: '' });
    const [achievementInput, setAchievementInput] = useState({ title: '', description: '', date: '', platform: '' });

    const handleReset = () => {
        updateField('name', '')
        updateField('title', '')
        updateField('email', '')
        updateField('phone', '')
        updateField('summary', '')
    }
    return (
        <>
            <div className="text-right mb-5">
                <Button type="primary" size="small" onClick={() => handleReset()} className="shadow-lg bg-blue-900 outline-none border-none hover:!bg-blue-800
                    border-gray-700">
                    Reset Details
                </Button>
            </div>
            <div className="h-[50rem] overflow-auto shadow-lg rounded-lg py-3">
                <Collapse defaultActiveKey={['1', '2', '3']} ghost>
                    {/* Personal Info */}
                    <Panel header="Personal Info" key="1">
                        <Input className="my_input" autoFocus placeholder="Name" value={resume?.name} onChange={e => updateField('name', e.target.value)} />
                        <Input className="my_input" placeholder="Title" value={resume?.title} onChange={e => updateField('title', e.target.value)} />
                        <Input className='my_input' placeholder="Email" value={resume?.email} onChange={e => updateField('email', e.target.value)} />
                        <Input className='my_input' placeholder="Phone" type='number' prefix='+91' value={resume?.phone} onChange={e => updateField('phone', e.target.value)} />

                    </Panel>

                    {/* Summary */}
                    <Panel header="Summary" key="2">
                        <Input.TextArea className='my_input' rows={4} placeholder="About You" value={resume?.summary} onChange={e => updateField('summary', e.target.value)} />
                    </Panel>

                    {/* Skills */}
                    <Panel header="Skills" key="3">
                        <div className="flex items-center gap-2 mb-2">
                            <Input className='my_input' value={skillInput} onChange={e => setSkillInput(e.target.value)} placeholder="Add skill" />
                            <Button className='p-3 border border-gray-400' icon={<PlusOutlined />} onClick={() => { if (skillInput) { addSkill(skillInput); setSkillInput(''); } }} />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {resume?.skills?.map(skill => (<Tag key={skill} closable onClose={() => removeSkill(skill)}>{skill}</Tag>))}
                        </div>
                    </Panel>

                    {/* Education */}
                    <Panel header="Education" key="4">
                        <Input className="my_input" placeholder="Institue" value={educationInput?.institute} onChange={e => setEducationInput({ ...educationInput, institute: e.target.value })} />
                        <Input className="my_input" placeholder="Deegree" value={educationInput?.degree} onChange={e => setEducationInput({ ...educationInput, degree: e.target.value })} />
                        {/* <Input className="my_input" placeholder="Year" value={educationInput?.year} onChange={e => setEducationInput({ ...educationInput, year: e.target.value })} /> */}
                        <RangePicker
                            className="my_input w-full"
                            picker="year"
                            placeholder={["From Year", "To Year"]}
                            value={
                                educationInput?.year
                                    ? (() => {
                                        const [from, to] = educationInput.year.split(" - ");
                                        return [dayjs(from, "YYYY"), dayjs(to, "YYYY")];
                                    })()
                                    : null
                            }
                            onChange={(dates) => {
                                if (dates && dates?.[0] && dates?.[1]) {
                                    const from = dates[0]?.format("YYYY");
                                    const to = dates[1]?.format("YYYY");
                                    setEducationInput({
                                        ...educationInput,
                                        year: `${from} - ${to}`,
                                    });
                                } else {
                                    setEducationInput({ ...educationInput, year: "" });
                                }
                            }}
                        />
                        <Button
                            className="add_button"
                            size="large"
                            block
                            icon={<PlusOutlined />}
                            onClick={() => {
                                const institute = educationInput?.institute?.trim();
                                const degree = educationInput?.degree?.trim();
                                const year = educationInput?.year?.trim();

                                if (institute && degree && year) {
                                    addEducation({
                                        id: Date.now().toString(),
                                        institute,
                                        degree,
                                        year,
                                    });
                                    setEducationInput({ institute: "", degree: "", year: "" });
                                } else {
                                    toast.error("education's all fields are required!");
                                }
                            }}
                        >
                            Add Education
                        </Button>
                        <div className="space-y-2 mt-2">
                            {resume?.education?.map(p => (
                                <div key={p?.id} className="flex justify-between bg-gray-200 p-2 rounded">
                                    <div>{p?.institute}</div>
                                    <Tooltip title='Remove'>
                                        <Button type="text" icon={<MdDelete className='text-red-600' size={25} />} onClick={() => removeEducation(p.id)} />
                                    </Tooltip>
                                </div>
                            ))}
                        </div>
                    </Panel>

                    {/* Projects */}
                    <Panel header="Projects" key="5">
                        <Input className="my_input" placeholder="Title" value={projectInput?.title} onChange={e => setProjectInput({ ...projectInput, title: e.target.value })} />
                        <Input.TextArea className="my_input" rows={2} placeholder="Description" value={projectInput?.desc} onChange={e => setProjectInput({ ...projectInput, desc: e.target.value })} />
                        <Input className="my_input" placeholder="Tech (comma separated)" value={projectInput?.tech} onChange={e => setProjectInput({ ...projectInput, tech: e.target.value })} />
                        <Input className="my_input" placeholder="Project Link" value={projectInput?.link} onChange={e => setProjectInput({ ...projectInput, link: e.target.value })} />
                        <Button className='add_button' size='large' block icon={<PlusOutlined />} onClick={() => {
                            const title = projectInput?.title?.trim()
                            const desc = projectInput?.desc?.trim()
                            const link = projectInput?.link?.trim()
                            const tech = projectInput?.tech?.trim()
                            if (title && projectInput?.desc && desc && link && tech) {
                                addProject({ id: Date.now().toString(), title: projectInput?.title, desc: projectInput?.desc, tech: projectInput?.tech.split(',').map(t => t.trim()), link: projectInput?.link });
                                setProjectInput({ title: '', desc: '', tech: '', link: '' });
                            } else {
                                toast.error("Project's all fields are required.")
                            }
                        }}>Add Project</Button>
                        <div className="space-y-2 mt-2">
                            {resume?.projects?.map(p => (
                                <div key={p?.id} className="flex justify-between bg-gray-200 p-2 rounded">
                                    <div>{p?.title}</div>
                                    <Tooltip title='Remove'>
                                        <Button type="text" icon={<MdDelete className='text-red-600' size={25} />} onClick={() => removeProject(p?.id)} />
                                    </Tooltip>
                                </div>
                            ))}
                        </div>
                    </Panel>

                    {/* Achievements */}
                    <Panel header="Achievements" key="6">
                        <Input className="my_input" placeholder="Title" value={achievementInput?.title} onChange={e => setAchievementInput({ ...achievementInput, title: e.target.value })} />
                        <Input.TextArea className="my_input" rows={2} placeholder="Description" value={achievementInput?.description} onChange={e => setAchievementInput({ ...achievementInput, description: e.target.value })} />
                        <Input className="my_input" placeholder="Platform" value={achievementInput?.platform} onChange={e => setAchievementInput({ ...achievementInput, platform: e.target.value })} />
                        <DatePicker
                            className="my_input w-full"
                            placeholder="Select Month & Year"
                            format={'YYYY-MM-DD'}
                            value={achievementInput?.date ? dayjs(achievementInput.date, "YYYY-MM") : null}
                            onChange={(date) =>
                                setAchievementInput({
                                    ...achievementInput,
                                    date: date ? date.format("YYYY-MM") : "",
                                })
                            }
                        />
                        <Button className='add_button' size='large' block icon={<PlusOutlined />} onClick={() => {
                            const achvTitle = achievementInput?.title?.trim();
                            const achvDesc = achievementInput?.description?.trim();
                            const achvPlatform = achievementInput?.platform?.trim();
                            const achvDate = achievementInput?.date?.trim()
                            if (achvTitle&&achvDesc&&achvPlatform&&achvDate) {
                                addAchievement({ id: Date.now().toString(), ...achievementInput });
                                setAchievementInput({ title: '', description: '', date: '', platform: '' });
                            }else{
                                toast.error("Achivement's all fields are required.")
                            }
                        }}>Add Achievement</Button>
                        <div className="space-y-2 mt-2">
                            {resume?.achievements?.map(a => (
                                <div key={a?.id} className="flex justify-between bg-gray-100 p-2 rounded">
                                    <div>{a?.title} - {a?.platform} ({a?.date})</div>
                                    <Tooltip title='Remove'>
                                        <Button type="text" icon={<MdDelete className='text-red-600' size={25} />} onClick={() => removeAchievement(a?.id)} />
                                    </Tooltip>
                                </div>
                            ))}
                        </div>
                    </Panel>
                </Collapse>
            </div>
        </>
    );
}