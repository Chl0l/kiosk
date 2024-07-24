import { ObjectType, InputType, Field, ID } from "type-graphql";

@InputType()
export class CreateOrUpdateTaxonomy {
  @Field(() => ID)
  id?: string;

  @Field()
  topic!: string;

  @Field()
  subtopic!: string;

  @Field()
  level!: number;

  @Field()
  questionLabel!: string;
}

@ObjectType()
export class TopicTitle {
  @Field()
  topic!: string;
}

@ObjectType()
export class SubTopicTitle {
  @Field()
  subTopic!: string;
}

@ObjectType()
export class TaxonomyTree {
  @Field(() => ID)
  id?: string;

  @Field()
  topic!: string;

  @Field()
  subtopic!: string;

  @Field()
  level!: number;

  @Field()
  questionLabel!: string;

  @Field(() => TaxonomyTree, { nullable: true })
  parent?: TaxonomyTree;

  @Field(() => [TaxonomyTree], { nullable: true })
  children?: TaxonomyTree[];
}
