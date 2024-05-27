import { mount } from '@vue/test-utils';
import DynamicForm from './DynamicForm.vue';

describe('DynamicForm.vue', () => {
    it('renders the initial field', async () => {
        const wrapper = mount(DynamicForm);
        await wrapper.vm.$nextTick();
        const inputFields = wrapper.findAll('input[placeholder^="Field"]');
        expect(inputFields.length).toBe(1);
    });

    it('adds a new field when "Add Field" button is clicked', async () => {
        const wrapper = mount(DynamicForm);
        const addButton = wrapper.find('button[type="button"]');
        await addButton.trigger('click');
        await wrapper.vm.$nextTick();
        const inputFields = wrapper.findAll('input[placeholder^="Field"]');
        expect(inputFields.length).toBe(2);
    });

    it('removes a field when "Remove" button is clicked', async () => {
        const wrapper = mount(DynamicForm);
        const addButton = wrapper.find('button[type="button"]');
        await addButton.trigger('click');
        await wrapper.vm.$nextTick();
        const removeButtons = wrapper.findAll('button[type="button"]');
        await removeButtons[1].trigger('click');
        await wrapper.vm.$nextTick();
        const inputFields = wrapper.findAll('input[placeholder^="Field"]');
        expect(inputFields.length).toBe(1);
    });

    it('updates the vowel count when text is entered', async () => {
        const wrapper = mount(DynamicForm);
        await wrapper.vm.$nextTick();
        const inputField = wrapper.find('input[placeholder^="Field"]');
        await inputField.setValue('hello');
        await wrapper.vm.$nextTick();
        const vowelCountSpan = wrapper.find('span');
        expect(vowelCountSpan.text()).toBe('Vowels: 2');
    });

    it('highlights fields containing the search query', async () => {
        const wrapper = mount(DynamicForm);
        const searchInput = wrapper.find('input[placeholder="Search..."]');
        const textInput = wrapper.find('input[placeholder^="Field"]');
        await textInput.setValue('hello');
        await searchInput.setValue('ell');
        await wrapper.vm.$nextTick();
        expect(textInput.classes()).toContain('highlight');
    });

    it('does not highlight fields not containing the search query', async () => {
        const wrapper = mount(DynamicForm);
        const searchInput = wrapper.find('input[placeholder="Search..."]');
        const textInput = wrapper.find('input[placeholder^="Field"]');
        await textInput.setValue('hello');
        await searchInput.setValue('xyz');
        await wrapper.vm.$nextTick();
        expect(textInput.classes()).not.toContain('highlight');
    });

    it('does not add more than 10 fields', async () => {
        const wrapper = mount(DynamicForm);
        const addButton = wrapper.find('button[type="button"]');
        for (let i = 0; i < 10; i++) {
            await addButton.trigger('click');
        }
        await wrapper.vm.$nextTick();
        const inputFields = wrapper.findAll('input[placeholder^="Field"]');
        expect(inputFields.length).toBe(10);
    });
});
