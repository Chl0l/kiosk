import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from "typeorm";
import {
  CreateOrUpdateTaxonomy,
  SubTopicTitle,
  TaxonomyTree,
} from "./Taxonomy.args";
import { TopicTitle } from "./Taxonomy.args";

@ObjectType()
@Entity()
@Tree("closure-table")
export class Taxonomy extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id!: string;

  @Column()
  @Field()
  topic!: string;

  @Column()
  @Field()
  subtopic!: string;

  @Column()
  @Field()
  level!: number;

  @Column()
  @Field()
  questionLabel!: string;

  @Column({ type: "text", nullable: true })
  @Field({ nullable: true })
  answer?: string;

  @TreeParent()
  @Field(() => Taxonomy, { nullable: true })
  parent?: Taxonomy | null;

  @TreeChildren({ cascade: true })
  @Field(() => [Taxonomy], { nullable: true })
  children?: Taxonomy[] | null;

  constructor(taxonomy?: CreateOrUpdateTaxonomy) {
    super();

    if (taxonomy) {
      this.topic = taxonomy.topic;
      this.subtopic = taxonomy.subtopic;
      this.level = taxonomy.level;
      this.questionLabel = taxonomy.questionLabel;
      this.answer = taxonomy.answer;
    }
  }

  static async getAllTopics(): Promise<TopicTitle[]> {
    const allTopics = await this.createQueryBuilder("taxonomy")
      .select("DISTINCT taxonomy.topic")
      .orderBy("taxonomy.topic", "ASC")
      .getRawMany();

    return allTopics.map((t) => ({ topic: t.topic }));
  }

  static async getAllSubTopics(): Promise<SubTopicTitle[]> {
    const allSubTopics = await this.createQueryBuilder("taxonomy")
      .select("taxonomy.subtopic")
      .distinct(true)
      .orderBy("taxonomy.subtopic", "ASC")
      .getRawMany();

    return allSubTopics.map((t) => ({ subTopic: t.taxonomy_subtopic }));
  }

  static async getSubTopicsByTopic(topic: string): Promise<SubTopicTitle[]> {
    const subTopics = await this.createQueryBuilder("taxonomy")
      .select("taxonomy.subtopic")
      .where("taxonomy.topic = :topic", { topic })
      .distinct(true)
      .orderBy("taxonomy.subtopic", "ASC")
      .getRawMany();

    return subTopics.map((t) => ({ subTopic: t.taxonomy_subtopic }));
  }

  static async getQuestions(
    topic: string,
    subtopic: string
  ): Promise<TaxonomyTree[]> {
    const repository = Taxonomy.getRepository();

    const questions = await repository
      .createQueryBuilder("taxonomy")
      .leftJoinAndSelect("taxonomy.parent", "parent")
      .leftJoinAndSelect("taxonomy.children", "children")
      .where("taxonomy.topic = :topic", { topic })
      .andWhere("taxonomy.subtopic = :subtopic", { subtopic })
      .orderBy("taxonomy.level", "ASC")
      .getMany();

    // Trying using buildTree method
    // const nodes: TaxonomyNode[] = questions.map((q) => ({
    //   id: q.id,
    //   level: q.level,
    //   topic: q.topic,
    //   subtopic: q.subtopic,
    //   questionLabel: q.questionLabel,
    //   // Note: Parent and children are not used here as buildTree handles it
    // }));

    // const tree = buildTree(nodes);

    // return tree;

    const questionMap = new Map<string, TaxonomyTree>();
    questions.forEach((q) => {
      questionMap.set(q.id!, {
        id: q.id!,
        topic: q.topic,
        subtopic: q.subtopic,
        level: q.level,
        questionLabel: q.questionLabel,
        answer: q.answer,
        parent: q.parent
          ? {
              id: q.parent.id!,
              topic: q.parent.topic!,
              subtopic: q.parent.subtopic!,
              level: q.parent.level,
              questionLabel: q.parent.questionLabel,
            }
          : undefined,
        children: [],
      });
    });

    const roots: TaxonomyTree[] = [];
    questionMap.forEach((q) => {
      if (q.parent) {
        const parent = questionMap.get(q.parent.id!);
        if (parent) {
          if (!parent.children) {
            parent.children = [];
          }
          parent.children.push(q);
        }
      } else {
        roots.push(q);
      }
    });

    return roots;
  }

  static async addAnswer(id: string, answer: string): Promise<Taxonomy | null> {
    const taxonomy = await Taxonomy.findOne({
      where: { id },
    });
    if (!taxonomy) {
      throw new Error("Taxonomy not found");
    }
    taxonomy.answer = answer;
    await taxonomy.save();
    return taxonomy;
  }
}
